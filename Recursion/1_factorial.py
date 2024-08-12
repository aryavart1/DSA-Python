# Program to print factorial of a number
# recursively.

def recursive_factorial(n):
    if n == 1:  # BASE CASE
        print("executed") 
        return n
    
    else:
        print("pass")
        return n * recursive_factorial(n-1)

num = 4

if num < 0:
    print("Invalid input !")
elif num == 0:
    print(1)
else:
    print(recursive_factorial(num))

