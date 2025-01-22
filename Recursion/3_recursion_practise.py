def theSequence(n):
    if n == 0:
        # Base case: if n is 0, return 1
        return 1
    
    else:
        # Recursive case: S(n) = n + n * S(n-1)
        return n + n * theSequence(n-1)

n = 2 
print(theSequence(n))