file_result = open('csvCleaned.txt','a')
with open("dataset_ACTUALIZADO.csv") as f:
    lines = f.readlines()
    i = 1
    #for soloLine in lines:
    for soloLine in lines:
        new_line = soloLine.replace(",",".")
        new_line = new_line.replace("#VALOR!",":")
        new_line = new_line.replace(";",",")
        print(new_line)
        file_result.write(new_line)
    file_result.close()

#with open("csvCleaned.csv") as f1:
#    lines=f1.readlines()   
#    print(lines[4])