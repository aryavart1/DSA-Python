# Program to print factorial of a number
# recursively.

def fib(n):
    if n == 0:  # BASE CASE 
        return 0
    
    if n == 1:
        return 1
    
    print(f"number{n}")
    return fib(n-1) + fib(n-2)

num = 5

if num < 0:
    print("Invalid input !")
else:
    print(fib(num))