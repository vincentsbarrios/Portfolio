import json
from graphviz import Digraph

class regularExpresion:
    
    #GLOBAL VARIABLE
    qNum = 0
        
    def addNode(self):
        txt = 'q'
        txt = txt + str(self.qNum)
        self.qNum += 1
        return txt
    
    
    def helpBuildTaransition(self,q0,symb,q1):
        container = []
        container.append(q0)
        container.append(symb)
        container.append(q1)
        return container
    
    def Transition(self,symb):
        q0 = self.addNode()
        q1 = self.addNode()
        nT = self.helpBuildTaransition(q0,symb,q1)
        return nT
    
    def createView(self,Initicial_state: str, Final_state: list, Table_lists: list):
        f = Digraph('Graph', filename='draws/NFAƐ.gv')
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
        
    
    def convertToNFAE(self,exp):    
        #VARIBLES
        explist = list(exp)
        
        nfaƐ = {}        
        newAlphabet = []
        states = []
        initalStates = 'q0'
        acceptingStates = []
        newTransitions = []
        
        #FINDS IF THERE IS AN OR ON THE EXPRESSION
        print('All the exp:',explist,'\n')
        
        
        for r in explist:
            if(r != '|'):
                if(r != '('):
                    if(r != ')'):
                        if(r != '*'):
                            if((r in newAlphabet) == False):
                                newAlphabet.append(r)
        
        #LOOP TO EVALUATE EXPRESION AND SEPARATE EACH EXP NEEDED
        leafs = []
        leafsPar = []
        foundPar = False
        foundFPar = False
        countPar = 0
        lastNode = ''
        lastSymb = ''
        foundOR = False
        endOR = 'q1'
        cCP = 0
        gC = 1
        gAst = 0
        #DEFAULT EPSILON
        z = self.Transition('Ɛ')
        newTransitions.append(z)
        lastNode = z[2]
        states.append(z[0])
        states.append(z[2])
        
        
        for ele in explist:
            
            #SYMBOL PRINT
                        #print(ele)
            if(gC != len(explist)):
                if(explist[0] == '('):
                    foundFPar = True
                if(explist[gC] == '*'):
                    if(gAst != 0):
                        foundFPar = False
                    gAst += 1
                    q = self.addNode()
                    if(foundFPar != True):
                        lastExp = lastNode
                    #print(lastExp)
                    z = self.helpBuildTaransition(lastNode,'Ɛ',q)
                    newTransitions.append(z)
                    
                    lastNode = q
                    states.append(lastNode)
                    
                if(explist[gC] == '|'):
                    foundOR = True
                    q = self.addNode()
                    
                    z = self.helpBuildTaransition(lastNode,'Ɛ',q)
                    newTransitions.append(z)
                    lastNode = q
                    
                    states.append(lastNode)
                       
            if(ele != '*'):
                if(ele != '('):
                    if(ele != ')'):
                        if(ele != '+'):
                            #print(ele)
                            if(ele == '|'):
                                #endOR = states[len(states)-1]
                                q = self.addNode()
                                #print(lastNode)
                                if(foundFPar != True):
                                    lastExp = lastNode
                                #print(endOR)
                                z = self.helpBuildTaransition(endOR,'Ɛ',q)
                                newTransitions.append(z)
                                lastNode = q
                                states.append(lastNode)
                                activeOR = True
                                
                            else:
                                if(foundPar != True):
                                    q = self.addNode()
                                    z = self.helpBuildTaransition(lastNode,ele,q)
                                    newTransitions.append(z)
                                    lastNode = q
                                    states.append(lastNode)
                                    qq = self.addNode()
                                    zz = self.helpBuildTaransition(lastNode,'Ɛ',qq)
                                    lastNode = qq
                                else:
                                    
                                    if(gC == len(explist)):
                                        print(foundOR)
                                        #op = self.addNode()
                                        
                                        #print(leafs)
                                        qa1 = self.addNode()
                                        zz = self.helpBuildTaransition(lastNode,'HERE',qq)
                                        lastNode = qq
                                        foundPar = False
                                        foundOR = False
                                        
                                    else:
                                        cn = self.addNode()                                    
                                        if(gC == len(explist)): #CHANGE
                                            #print('dsdds',explist[gC-2])
                                            leafs = [] 
                                        print(leafs)
                                        for ff in leafs:
                                            z = self.helpBuildTaransition(ff,'Ɛ',cn)
                                            newTransitions.append(z)
                                            print(z)
                                            states.append(cn)
                                        #print(states)
                                        ww = self.helpBuildTaransition(states[len(states)-2],'Ɛ',cn)#change
                                        #ww = self.helpBuildTaransition(lastNode,'Ɛ',cn)
                                        newTransitions.append(ww)
                                        lastNode = cn 
                                        q = self.addNode()
                                        azz = self.helpBuildTaransition(lastNode,ele,q)
                                        newTransitions.append(azz)
                                        lastNode = q
                                        wq = self.addNode()
                                        zz = self.helpBuildTaransition(q,'Ɛ',wq)
                                        lastNode = wq
                                        #print(wq)
                                        foundPar = False
                                        foundOR = False
                                        
                               
                                #if(gC+1 == len(explist)):
                                    #print('finish',qq)
                                if(gC != len(explist)):
                                    #print(explist[gC])
                                    #print(foundOR)
                                    if(explist[gC] == ')'):
                                        #print(len(exp),gC)
                                        cCP += 1
                                        foundPar = True
                                    if(explist[gC] == '('):
                                        endOR = qq
                                    if(explist[gC] == '|'):
                                        #print('end',qq)
                                        leafs.append(qq)
                                ##leafs.append(qq)
                                    newTransitions.append(zz)
                                #lastNode = qq
                                #print(lastNode)
                                states.append(lastNode)
            
            #print(ele)
            
            if(ele == '*'):
                
                #qq = self.addNode()
                #zz = self.helpBuildTaransition(lastNode,'Ɛ',qq)
                #newTransitions.append(zz)
                tp = ''
                if(gC != len(explist)):
                    tp = exp[gC]
                if(tp == '|'):
                    #print('other',lastNode)
                    leafs.append(lastNode)
                
                lastNode = qq
                states.append(lastNode)
                #print(lastExp,states[len(states)-2])
                t1 = self.helpBuildTaransition(lastExp,'Ɛ',states[len(states)-2])
                newTransitions.append(t1) 
                t2 = self.helpBuildTaransition(states[len(states)-2],'Ɛ',lastExp)
                newTransitions.append(t2)
            #BASE DECISION CONCAT SYMBOLS
            gC += 1
        
        #acceptingStates.append(lastNode)
        #print('finish',lastNode)
        leafs.append(lastNode)
        
        if(foundOR == True):
            #print('Ending States OR|*',leafs)
            q = self.addNode()
            for lf in leafs:
                z = self.helpBuildTaransition(lf,'Ɛ',q)
                newTransitions.append(z)
                acceptingStates.append(q)
        
        #print(lastNode)    

        
        nfaƐ['alphabet'] = newAlphabet
        nfaƐ['states'] = states
        nfaƐ['initial_state'] = initalStates
        nfaƐ['accepting_states'] = acceptingStates
        nfaƐ['transitions'] = newTransitions
        
        #print(states)
        
        with open('json/Answer/NFA_Ɛ.json', 'w') as outfile:
            json.dump(nfaƐ, outfile)
            
        with open('json/exampleNFAƐ/send/NFAEpsilon.json', 'w') as outfile:
            json.dump(nfaƐ, outfile)
        
        #DRAWING
        self.createView(initalStates,acceptingStates,newTransitions)

            
        #from graphviz import Source
        #src = Source('digraph "the holy hand grenade" { rankdir=LR; 1 -> 2 -> 2 -> lob }')
        #src.createView('test-output/holy-grenade.gv', view=True)  
            
        
        #print('\n\nNFA CONVERTED\n',nfaƐ)
        print('\nTransitions')
        for nt in newTransitions:
            print(nt)
        
        print('\nTransitions\n',nfaƐ)
        
        return nfaƐ
    
    #METHOD 1
    def executeExp(self):
      #print('\n Please enter a expresion: ')
      #exp = input()

      exp = 'A(B*D|F)RR*V'
      ff = self.convertToNFAE(exp)
      
      return ff
  
  
#--------------------MAIN--------------------------------------  
a = regularExpresion()
b = a.executeExp()

