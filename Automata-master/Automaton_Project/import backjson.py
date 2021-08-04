import json

class regularExpresion:
    def __init__(self,fileName):
        self.file = fileName
        
    def addNode(self,num):
        txt = 'q'
        txt = txt + str(num)
        return txt
    
    def epsilonContainer(self,q1,q2):
        container = []
        container.append(q1)
        container.append('Ɛ')
        container.append(q2)
        return container    
        
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
        listOR = []
        container = []
        c = 0
        
        for r in explist:
            if(r != '|'):
                if(r != '('):
                    if(r != ')'):
                        if(r != '*'):
                            if((r in newAlphabet) == False):
                                newAlphabet.append(r)
        
        #LOOP TO EVALUATE EXPRESION AND SEPARATE EACH EXP NEEDED
        
        for x in range(len(explist)):
            
            if(len(explist) == 1):
                container = [] 
                
                container.append(explist[c])
                listOR.append(container)
                break
                
            
            if(explist[c] == '|'):
                c = c + 1
                listOR.append(container)
                container = []  
            container.append(explist[c])  
            
            #if(explist[c-1] == '|'):
            #    listOR.append(container)
                      
            c = c + 1
            if(c == len(explist)):
                listOR.append(container)
                break;
        #END_FOR
        
        #ASSAMBLE OF THE EXP TO NFAE
        #VARIABLES
        lastNode = ''
        lastNodeConnect = ''
        cN = 0
        cF = 0
        container = []
        
        #FIRST EPSILON
        q = self.addNode(cN)
        container.append(q)
        container.append('Ɛ')
        cN = cN + 1
        q = self.addNode(cN)
        container.append(q)
        newTransitions.append(container)
        lastNode = q
        lastNodeConnect = q
        intial = q
        finishNode = []
        
        for e in listOR:
            if(len(listOR) == 1):
                for w in e:
                    container = []
                    
                    print('cont')
                    container.append(lastNode)
                    container.append(w)
                    cN = cN + 1
                    q = self.addNode(cN)
                    container.append(q)
                    
                    print(container)
                    newTransitions.append(container)
                    
                    q1 = self.addNode(cN)
                    cN = cN + 1
                    q2 = self.addNode(cN)
                    cont = self.epsilonContainer(q1,q2)
                    lastNode = q2
                    print(cont)
                    newTransitions.append(cont)
                    
            else:
                #print('-->',e)
                if(len(e) < 2):
                    container = []
                    container.append(lastNode)
                    container.append(e[0])
                    cN = cN + 1
                    q = self.addNode(cN)
                    container.append(q)
                    finishNode.append(q)
                    newTransitions.append(container)
                    #->print(container)
                else:
                    lastNodeConnect = intial
                    cF = 0
                    for w in e:
                        print(w)
                        
                        container = []
                        container.append(lastNodeConnect)
                        container.append(w)
                        cN = cN + 1
                        q = self.addNode(cN)
                        lastNodeConnect = q
                        container.append(q)
                        print(container)
                        if(w != '*'):
                            newTransitions.append(container)
                        #print(len(e))
                        if(len(e)-1 != cF):
                            q1 = self.addNode(cN)
                            cN = cN + 1
                            q2 = self.addNode(cN)
                            cont = self.epsilonContainer(q1,q2)
                            newTransitions.append(cont)
                            lastNodeConnect = q2
                        
                        cF = cF + 1
                        if(len(e) == cF):
                            finishNode.append(q)
                    #END_FOR
                #END_FOR
            #END_ELSE
            
            #CONNECTING THE ENDING EPSILON TO A ACEPTABLE STATE
        l = []
        l.append(q)
        acceptingStates = l
        print('\nFinish Node')
        print(finishNode)
        cN = cN + 1
        vv = self.addNode(cN)
        for rr in finishNode:
            container = []
            container.append(rr)
            container.append('Ɛ')
            container.append(vv)
            newTransitions.append(container)
                
        
        l = []
        l.append(lastNode)
        acceptingStates = l
        #container.append('Ɛ')        
        
        
        print('\nLIST OR\n',listOR)
        nfaƐ['alphabet'] = newAlphabet
        nfaƐ['states'] = states
        nfaƐ['initial_state'] = initalStates
        nfaƐ['accepting_states'] = acceptingStates
        nfaƐ['transitions'] = newTransitions
        
       
        
        #print('\n\nNFA CONVERTED\n',nfaƐ)
        print('\nTransitions')
        for nt in newTransitions:
            print(nt)
        return nfaƐ
        
    #METHOD 1
    def executeExp(self):
      print('\n Please enter a expresion: ')
      
      #A|BC|D
      #X|(YZ)
      exp = 'A|Z*'
      
      
      a = regularExpresion
      self.convertToNFAE(exp)
      
      return 'wait'
  
a = regularExpresion('fileName')
b = a.executeExp()