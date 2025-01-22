import { chromium } from 'playwright';
import * as fs from 'fs';

(async () => {
  // Step 1: Load search data from JSON file
  const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  const searchTerms: string[] = jsonData.searchTerms;

  // Step 2: Launch the browser
  const browser = await chromium.launch({ headless: false }); // Use headless: true for silent mode
  const context = await browser.newContext();
  const page = await context.newPage();

  // Step 3: Navigate to the target website
  const url = 'https://example.com'; // Replace with the actual website URL
  await page.goto(url);

  // Step 4: Prepare the output text file
  const outputFilePath = 'copiedData.txt';
  fs.writeFileSync(outputFilePath, ''); // Clear the file at the start

  // Step 5: Loop through search terms
  for (const term of searchTerms) {
    console.log(`Processing search term: ${term}`);
    
    // Locate the search bar and fill it with the current search term
    await page.fill('input[name="q"]', term); // Adjust selector based on the actual website

    // Press Enter to submit the search
    await page.press('input[name="q"]', 'Enter');

    // Wait for the search results to load
    await page.waitForLoadState('domcontentloaded');
z
    // Locate the searched data on the new page
    const resultLocator = page.locator(`text="${term}"`);
    if (await resultLocator.count() === 0) {
      console.log(`Error: Could not find the term "${term}" in search results.`);
      continue;
    }

    console.log(`Found search result for: ${term}`);

    // Locate the three dots button associated with the searched data
    const threeDotsButton = resultLocator.locator('css=button.three-dots'); // Adjust the selector
    await threeDotsButton.click();

    // Wait for the dropdown to appear and locate the Copy button
    const copyButton = page.locator('css=button.copy'); // Adjust the selector
    await copyButton.click();

    // Wait for the popup to appear
    const popup = page.locator('css=div.popup'); // Adjust the selector
    await popup.waitFor();

    // Fill the popup input field with the value "test"
    await popup.locator('css=input.popup-input').fill('test'); // Adjust the selector

    // Click on the copy button inside the popup
    const popupCopyButton = popup.locator('css=button.popup-copy'); // Adjust the selector
    await popupCopyButton.click();

    // Wait for confirmation (optional, depending on the website behavior)
    await page.waitForTimeout(1000); // Adjust as needed

    // Save the copied data to a text file
    const copiedData = await resultLocator.textContent(); // Extract the data
    if (copiedData) {
      fs.appendFileSync(outputFilePath, `${copiedData}\n`, 'utf8');
      console.log(`Copied data saved: ${copiedData}`);
    } else {
      console.log('Error: No data was copied.');
    }

    // Optional: Go back to the main search page for the next iteration
    await page.goBack();
  }

  // Step 6: Close the browser
  await browser.close();

  console.log(`All copied data has been saved to ${outputFilePath}`);
})();

