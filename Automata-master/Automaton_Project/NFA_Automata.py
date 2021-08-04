import json
from graphviz import Digraph

class nfa_automata:
    def __init__(self,alphabet,states,intialStates,acceptingStates,transitions):
        self.alphabet = alphabet
        self.states = states
        self.intialStates = intialStates
        self.acceptingStates = acceptingStates
        self.transitions = transitions
        
    #METHOD 1
    def print_nfa(self):
      print('\n Data Input')
      print('Alphabet:',self.alphabet)
      print('States:',self.states)
      print('InicialStates',self.intialStates)
      print('AcceptingState',self.acceptingStates)
      print('Transitions',self.transitions)
        
    #METHOD 2    
    def helperF(self,st):
        t = []
       
        table = []
        t.append(st)
        for alpha in alphabet:
            tp = []
            tpp = []
            for x in range(len(transitions)):
                if(st == transitions[x][0]):
                    if(alpha == transitions[x][1]):
                        
                        if((alpha in tp) == False):
                            tp.append(alpha)
                        #print(alpha,transitions[x][2])
                        #tp.append(transitions[x][2])
                        tpp.append(transitions[x][2])
            if(len(tpp) != 0):
                tp.append(tpp)
            if(len(tp) == 0):
                tp.append(alpha)
                tp.append('∅')
            #print(alpha,tp)
            t.append(tp)    
        return t
        
        
    def nfaFirstEvaluation(self):
        table = []
        for st in states:
            table.append(self.helperF(st))
        return table     
                
                      
    def evalNode(self,node,newStates,newTable):
        #print('\nCurrent node:',node,'\n')       
        #for q in range(len(table)):
        #    print(table[q][0],'-',table[q][1],'-',table[q][2]) 
    
        #print('\nNODE;',node,'\n',node in newTable)
        newTable.append(node) 
        
        #hold the current positions value of alphabet
        alphaPos = 0
        
        for alpha in self.alphabet:
            #VARIABLES
            container = []
            newStateFromContainer = []
            
            container.append(alpha)
            alphaPos = alphaPos + 1 
            #print('Symbol:',alpha)
            for n in node:
                for q in range(len(table)):
                    if(n == table[q][0]):
                        #print(n,table[q][0],'-',table[q][alphaPos])
                        ta = table[q][alphaPos]
                        #print(ta[0],':',ta[1])
                        if(ta[1] != '∅'):  
                            #if((ta[1] in newStates) == False):
                            #    newStates.append(ta[1])
                                
                            for taElement in ta[1]:
                                if((taElement in container) == False):
                                    container.append(taElement)
            tcontainer = []                    
            tcontainer = tcontainer + container
            popE = tcontainer.pop(0)
            tcontainer.sort()
            newContainer = []
            newContainer.append(popE)
            newContainer = newContainer + tcontainer
            
                                
            #print('\nContainer',container)
            #print('\nNew conatainer->',newContainer)
            
            for x in range(1,len(container)):
                newStateFromContainer.append(newContainer[x])
                newStateFromContainer.sort()
            if(len(newContainer) == 1):
                newContainer.append('∅')
                
            if(len(newStateFromContainer) != 0):
                 #print('here->',newStateFromContainer,newStateFromContainer in newStates)
                 if((newStateFromContainer in newStates) == False):
    
                     newStates.append(newStateFromContainer)
            
            newTable.append(newContainer) 
    #end_of_def_evalNode
            
    def nfa_convertion(self,table):
        #Variables
        globalCounter = 0
        newStates = []
        newTable = []
        fixTable = []
        fixCTable = []
        
        #for q in range(len(table)):
        #    print(table[q][0],'-',table[q][1],'-',table[q][2]) 
            
        #add the initial state    
        newStates.append(self.intialStates) 
        #add the firsts elements from the table to the new trasition table
        newTable.append(table[0][0]) 
        for alPos in range(1,len(alphabet)+1):
            tmp = []
            a = table[0][alPos]
            #print(a)
            tmp.append(alphabet[alPos-1])
            for element in range(len(a[1])):
                nodeV = a[1]
                #print(nodeV[element])
                tmp.append(nodeV[element])
            #print(tmp)
            newTable.append(tmp)
        
        #newTable.append(table[0][2])
        
        for alpha in range(len(alphabet)):
            qq = table[0][alpha+1]
            #print(qq[1])
            #print(qq[1] in newStates)
            if((qq[1] in newStates) == False):
                newStates.append(qq[1])
        
        sizeNewState = len(newStates)
        #print('\n\n*******************test***********************')
        while(1):
            if(globalCounter >= sizeNewState):
                break;

            if(type(newStates[globalCounter]) != str):
                self.evalNode(newStates[globalCounter],newStates,newTable)
                #break;
                
            sizeNewState = len(newStates)
            globalCounter = globalCounter + 1
        #end_while
        
        #print('\n\n*****NEW STATE****')
        #print(newStates)
        #print('\n\n*****DFA DEMO****')
        #print(newTable)
        
        #Fixing first state of table from str to list
        for x in range(len(newTable)):
            if((type(newTable[x]) == type('str')) == True):
                tl = []
                tl.append(newTable[x])
                fixTable.append(tl)
            else:
                #if((newTable[x] in fixTable) == False):
                #print(newTable[x],(newTable[x] in fixTable) == False)
                fixTable.append(newTable[x])
                
            
        #for uu in range(0,len(newTable),3):
        #    print('\nState',newTable[uu],':',newTable[uu+1],newTable[uu+2])
        #print('\n\n*****DFA fixTable****')
        sizeAlphabet = len(self.alphabet) + 1
        counter = 1
        setAdd = False
        for uu in range(0,len(fixTable),sizeAlphabet):
            #print('\nState',fixTable[uu], fixTable[uu] in fixCTable)
            setAdd = (fixTable[uu] in fixCTable)
            if(setAdd == False):
                fixCTable.append(fixTable[uu])
            while(counter != sizeAlphabet):
                #print(fixTable[uu+counter])
                if(setAdd == False):
                    fixCTable.append(fixTable[uu+counter])
                counter = counter + 1
            if(counter == sizeAlphabet):
                counter = 1
        
            
        return fixCTable
    
    def createView(self,Initicial_state: str, Final_state: list, Table_lists: list):
        f = Digraph('Graph', filename='draws/DFA.gv')
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
    
    def convertToJSON(self,dfaTable):
        #VARIABLES
        dfa = {}
        newAlphabet = self.alphabet
        initalStates = self.intialStates
        states = []
        acceptingStates = []
        newTransitions = []
        
        sizeAlphabet = len(self.alphabet) +1
        for uu in range(0,len(dfaTable),sizeAlphabet):
            states.append(dfaTable[uu])   
        
        for aceptingNode in self.acceptingStates:
            for node in states:
                #print('\n',node, aceptingNode in node)
                if((aceptingNode in node) == True):
                    acceptingStates.append(node)
                    
        #self.printDfaTable(dfaTable)    
        #print('\n')
        sizeAlphabet = len(self.alphabet) +1
        counter = 1
        
        for uu in range(0,len(dfaTable),sizeAlphabet):
            
            #print('\nState',dfaTable[uu])
            while(counter != sizeAlphabet):
                nodeAlpha = dfaTable[uu+counter]
                nodeSize = len(nodeAlpha)
                count = 1
                container = []
                concat2 = ''
                for gg in dfaTable[uu]:
                    concat2 = concat2 + gg
                #print(concat2)
                container.append(concat2)
                
                container.append(alphabet[counter-1])
                
                #print(nodeAlpha)
                concat = ''
                for c in range(1,len(nodeAlpha)):
                    #print(nodeAlpha[c])
                    concat = concat + nodeAlpha[c]
                    
                #print(concat)
                '''temp = list(concat)
                temp.sort()
                #print('HERE->',temp)
                concat3 = ''
                for c in range(len(temp)):
                    #print(nodeAlpha[c])
                    concat3 = concat3 + temp[c]
                    
                #print(concat3)
                container.append(concat3)'''
                container.append(concat)
                #print('-->',container)
                newTransitions.append(container)
                counter = counter + 1
            if(counter == sizeAlphabet):
                counter = 1
                
        dfa['alphabet'] = newAlphabet
        dfa['states'] = states
        dfa['initial_state'] = initalStates
        dfa['accepting_states'] = acceptingStates
        dfa['transitions'] = newTransitions
        #print('\n\n',dfa)
        
        newAcceptingDraw = []
        for sa in acceptingStates:
            cont  = []
            concat = ''
            for s in sa:
                concat = concat + s
            newAcceptingDraw.append(concat)
            
        print('\n\n',newTransitions)
        
        #self.createView(initalStates,newAcceptingDraw,newTransitions)
        
        with open('json/Answer/DFA.json', 'w') as outfile:
            json.dump(dfa, outfile)
        
        return dfa
    
    def printDfaTable(self,dfaTable):
        sizeAlphabet = len(self.alphabet) +1
        counter = 1
        print('\n\n*****DFA TABLE****')
        for uu in range(0,len(dfaTable),sizeAlphabet):
            print('\nState',dfaTable[uu])
            while(counter != sizeAlphabet):
                print(dfaTable[uu+counter])
                counter = counter + 1
            if(counter == sizeAlphabet):
                counter = 1
                
    def printMainTable(self):
        print('\nMain Table')
        table = p1.nfaFirstEvaluation()
        for q in range(len(table)):
                print(table[q][0],'-',table[q][1],'-',table[q][2])
                
    def evaluationHelperTrans(self,currentNode,exp,transitions):
        for x in transitions:
            orig = x[0]
            symb = x[1]
            dest = x[2]
            if(currentNode == orig):
                if(symb == exp):
                    print('-->',orig,symb,dest)
                    return dest
                
        return 'fail'

    def evaluateSymbol(self,listInput,transitions,acceptingStates):
            counter = 0
            countList = 0
            currentN = initalStates
            sz = len(listInput)
            
            while(1):
                currentS = listInput[countList]
                #print('-->',currentN,'-',currentS)
                
                currentN = self.evaluationHelperTrans(currentN,currentS,transitions)
                
                if(currentN == 'fail'):
                    return 'fail'
                
                if(countList != sz):
                    countList = countList + 1
                    if(countList == sz):
                        for xx in acceptingStates:
                            concat = ''
                            for yy in xx:
                                concat = concat + yy
                                #print('-->',concat,currentN)
                            if(concat == currentN):
                                
                                #print('Pass')
                                return 'pass'
                        return 'fail'
                    currentS = listInput[countList]
                    
                
                '''
                for xx in acceptingStates:
                    concat = ''
                    for yy in xx:
                        concat = concat + yy
                    if(concat == currentN):
                        countList = countList + 1
                        currentS = listInput[countList]
                '''
                #if(counter == 4):
                #    break
                #else:
                #    counter = counter + 1

            
    #end_evaluetSymbol         
                
    def readJSONEvaluate(self):
        print('\n\nEVALUATE JSON')
        with open('json/Answer/DFA.json') as file:
            data = json.load(file)
            
        
        alphabet = data['alphabet']
        states = data['states']
        initalStates = data['initial_state']
        acceptingStates = data['accepting_states']
        transitions = data['transitions']
        
        #print(data)
        inputData = input('\nExpresion evaluate: ')
        #inputData = 'ab'
        
        
        listInput = list(inputData)
        
        result = self.evaluateSymbol(listInput,transitions,acceptingStates)
        
        if(result == 'fail'):
            print('\nThe expresion is not part of the automata languaje')
            #print('\nLa expresion no es parte del lenguaje del automata.')
        else:
            print('\nThe expresion is part of the automata languaje')
            #print('\nLa expresion es parte del automata')


#--------------------MAIN--------------------------------------

filename = input("\nPlease enter file name: ")
path = 'json/exampleNFA/' + filename + '.json'
with open(path) as file:
    nfa = json.load(file)

#READING AN EXAMPLE
#with open('json/exampleNFA/ex1.json') as file:
#    nfa = json.load(file)

alphabet = nfa['alphabet']
states = nfa['states']
initalStates = nfa['initial_state']
acceptingStates = nfa['accepting_states']
transitions = nfa['transitions']

#MAIN
p1 = nfa_automata(alphabet,states,initalStates,acceptingStates,transitions)
table = p1.nfaFirstEvaluation() 
dfaTable = p1.nfa_convertion(table)
#p1.printMainTable()
p1.printDfaTable(dfaTable)
dfa = p1.convertToJSON(dfaTable)
#print(dfa)

#with open('json/automata_DFA.json', 'w') as json_file:
#  json.dump(dfa, json_file)  
p1.readJSONEvaluate()