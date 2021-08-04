import json
from graphviz import Digraph

def arrangeTable():
    sortTable = []

    for st in states:
        for w in range(len(transitions)):
            #print(transitions[w][0])
            temp = []
            if(transitions[w][0] == st):
                #print(transitions[w][0],transitions[w][1],transitions[w][2])
                temp.append(transitions[w][0])
                temp.append(transitions[w][1])
                temp.append(transitions[w][2])
                sortTable.append(temp)
    return sortTable

def buildTable(sortTable,alphabet,states):
    table = [] 
    
    for st in states:
        ##print('symbol',st)
        tl = []
        for a in range(len(sortTable)):
            
            e1 = sortTable[a][0]
            e2 = sortTable[a][1]
            e3 = sortTable[a][2]
            #print(e1,e2,e3)
            if(e1 == st):
                #print(e1,e2,e3)
                if((e1 in tl) == False):
                    tl.append(e1)
            
        for alpha in alphabet:
            al = []
            ##print('Evaluate:',alpha)
            if(len(tl) == 0):
                tl.append(st)
            
            for b in range(len(sortTable)):
                b1 = sortTable[b][0]
                b2 = sortTable[b][1]
                b3 = sortTable[b][2]
                if(b1 == st):
                    if(alpha == b2):
                        if((alpha in al) == False):
                            al.append(alpha)
                        ##print(b1,b2,b3)
                        al.append(b3)
            if(len(al) == 0):
                al.append(alpha) 
                al.append('∅')  
                tl.append(al)
                #print(al)   
            else: 
                tl.append(al)
                    
        ##print('\nS = ',tl)
        table.append(tl)
        ##print('\n') 
    
    return table

def returnColumn(table,alpha):
    epsilon = []
    for x in table:
        for y in range(len(x)):
            #print(x[y])
            if((x[0] in epsilon) == False):
                epsilon.append(x[0])
                
            
            if((len(x[y]) > 1) == True):
                if(alpha == x[y][0]):
                    #print(x[y][0],x[y])
                    epsilon.append(x[y])    
    
    #for t in epsilon:
    #    print(t)    
    return epsilon

def epsilonState(table):
    epsilon = []
    
    
    for st in states:
        #print('State:',st)
        epsilon.append(st)
        colEp = returnColumn(table,'Ɛ')
        for a in range(0,len(colEp),2):
            #print(colEp[a],colEp[a+1])
            if(colEp[a] == st):
                t = []
                #print(colEp[a],colEp[a+1]) 
                #if((colEp[a] not in t) == False):   
                t.append(colEp[a])
                for b in colEp[a+1]:
                    if(b != 'Ɛ'):
                        if(b != '∅'):
                            if((b in t) == False):
                                t.append(b)
        epsilon.append(t)
    
    return epsilon

def epsilonAlphaHelper(alpha,table,cƐq):
    epsilon = []
     
    col = returnColumn(table,alpha)
    
    for b in range(0,len(cƐq),2):
        #print(cƐq[b],'-',cƐq[b+1])
        t = []   
        epsilon.append(cƐq[b])
        epsilon.append(alpha)
        for c in cƐq[b+1]:
            #print('ST',c,alpha)
            for a in range(0,len(col),2):
                if(col[a] == c):
                    #print(col[a],col[a+1])
                    for d in col[a+1]:
                        if(d != alpha):
                            if(d != '∅'):
                                #print(d)
                                t.append(d)
        if(len(t) == 0):
            epsilon.append('∅')
        else:
            epsilon.append(t)

    
    return epsilon

def epsilonAlpha(table,cƐq):
    cƐqAlpha = []
    for alpha in alphabet:
        if(alpha != 'Ɛ'):
            cƐAa = epsilonAlphaHelper(alpha,table,cƐq)
            for c in range(0,len(cƐAa),3):
                #print('State',':',cƐAa[c],'-',cƐAa[c+1],'-',cƐAa[c+2])
                cƐqAlpha.append(cƐAa[c])
                cƐqAlpha.append(cƐAa[c+1])
                cƐqAlpha.append(cƐAa[c+2])
    return cƐqAlpha

def epsilonDAlpha(cƐqAlpha,cƐq,alphabet):
    epsilon = []
    for alpha in alphabet:
        if(alpha != 'Ɛ'):
            for c in range(0,len(cƐqAlpha),3):
                if(cƐqAlpha[c+1] == alpha):
                    #print('Shhhhhh:',cƐqAlpha[c],'-',cƐqAlpha[c+1],cƐqAlpha[c+2])
                    epsilon.append(cƐqAlpha[c])
                    epsilon.append(cƐqAlpha[c+1])
                    t = []
                    for q in cƐqAlpha[c+2]:
                        for f in range(0,len(cƐq),2):
                            if(q == cƐq[f]):
                                #print(q,cƐq[f],cƐq[f+1])
                                for g in cƐq[f+1]:
                                    t.append(g)
                    

                    if(len(t) == 0):
                        epsilon.append('∅') 
                    else:          
                        epsilon.append(t)
                 
            print('\n')
    return epsilon

def createView(Initicial_state: str, Final_state: list, Table_lists: list):
        f = Digraph('Graph', filename='draws/NFA.gv')
        f.attr(rankdir='LR', size='5')
        f.node('fake', style='invisible')      
        f.edge('fake', Initicial_state, style='bold')
        if Initicial_state in Final_state:
            f.node(Initicial_state, root='true', shape='doublecircle')
        else:
            f.node(Initicial_state, root='true')
        f.attr('node', shape='doublecircle')
        for final_state in Final_state:
            print(final_state)
            f.node(final_state)
        f.attr('node', shape='circle')
        for x in range(0, len(Table_lists)):
            if Table_lists[x] == ["", "", ""]:
                print(" ")
            else:
                f.edge(Table_lists[x][0], Table_lists[x]
                    [2], label=Table_lists[x][1])
        f.view()
        

def createNfa(alphabet,initalStates,states,acceptingStates,cƐqDAlpha):
    nfa = {}
    newAlphabet = []
    newTransitions = []
    
    
    print('\nTransitions')
    
    for alpha in alphabet:
        if(alpha != 'Ɛ'):
           newAlphabet.append(alpha)
    
    for x in range(0,len(cƐqDAlpha),3):
        #print(cƐqDAlpha[x],cƐqDAlpha[x+1],cƐqDAlpha[x+2])
        if(cƐqDAlpha[x+2] != '∅'):
            #print(cƐqDAlpha[x],cƐqDAlpha[x+1],cƐqDAlpha[x+2])    
            for a in cƐqDAlpha[x+2]:
                #print(a)
                t = []
                t.append(cƐqDAlpha[x])
                t.append(cƐqDAlpha[x+1])
                t.append(a)
                print(t)
                newTransitions.append(t)
    
    

    
    nfa['alphabet'] = newAlphabet
    nfa['states'] = states
    nfa['initial_state'] = initalStates
    nfa['accepting_states'] = acceptingStates
    nfa['transitions'] = newTransitions
    
    with open('json/Answer/NFA.json', 'w') as outfile:
            json.dump(nfa, outfile)
            
    with open('json/exampleNFA/send/NFA.json') as file:
            nfa_Ɛ = json.load(file)
            
    alphabet = nfa_Ɛ['alphabet']
    states = nfa_Ɛ['states']
    initalStates = nfa_Ɛ['initial_state']
    acceptingStates = nfa_Ɛ['accepting_states']
    transitions = nfa_Ɛ['transitions']
    
    
    
    createView(initalStates,acceptingStates,transitions)
    
    
    return nfa

 
#--------------------MAIN--------------------------------------

#filename = input("\nPlease enter file name: ")
#path = 'json/exampleNFAƐ/' + filename + '.json'

with open('json/exampleNFAƐ/nfa_Epsilon4.json') as file:
            nfa_Ɛ = json.load(file)
            
alphabet = nfa_Ɛ['alphabet']
states = nfa_Ɛ['states']
initalStates = nfa_Ɛ['initial_state']
acceptingStates = nfa_Ɛ['accepting_states']
transitions = nfa_Ɛ['transitions']

#variables
table = [] 

 #functions
sortTable = arrangeTable()         
table = buildTable(sortTable,alphabet,states)   
cƐq = epsilonState(table)
cƐqAlpha = epsilonAlpha(table,cƐq)
cƐqDAlpha = epsilonDAlpha(cƐqAlpha,cƐq,alphabet)

print('MAIN TABLE')
for a in table:
    print(a)
    
print('\nCƐ(q)')
for b in range(0,len(cƐq),2):
    print('State:',cƐq[b],'-',cƐq[b+1]) 
    
print('\nCƐ(q)Alpha')
for c in range(0,len(cƐqAlpha),3):
    print('State:',cƐqAlpha[c],'-',cƐqAlpha[c+1],cƐqAlpha[c+2])

print('\nCƐd(q)Alpha')
for x in range(0,len(cƐqDAlpha),3):
        print(cƐqDAlpha[x],cƐqDAlpha[x+1],cƐqDAlpha[x+2])

nfa = createNfa(alphabet,initalStates,states,acceptingStates,cƐqDAlpha)
print('\nNFA Equivalent')
print(nfa)
    
