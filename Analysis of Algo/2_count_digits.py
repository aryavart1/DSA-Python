x = int(input("Enter x:"))
res = 0

if (x > 0):
 while(x > 0):
   x = x//10
   res = res + 1

print("Count of digits:" + str(res))