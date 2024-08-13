
num = int(input("Enter a number:"))

# Print 1 to N

def print1toN(n):
    if n == 0:
        return
    print1toN(n - 1)
    print(n)

print1toN(num)

# Print 1 to N

def printNto1(n):
    if n == 0:
        return
    print(n)
    printNto1(n - 1)


printNto1(num)

# Sum of Digits

def dSum(n):
    if n < 10:
        return n
    return dSum(n // 10) + n % 10

print(dSum(num))
