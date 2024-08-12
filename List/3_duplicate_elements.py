def removeDuplicates(arr, n):
    res=1
    l=[]
    for i in range(1, n):
        if(arr[res-1]!=arr[i]):
            arr[res]=arr[i]
            res+=1

    for i in range(0, res):
        l.append(arr[i])

            
    return res, l 
    
n=7
arr=[10, 20, 20, 30, 30, 30, 30]
print(removeDuplicates(arr, n))