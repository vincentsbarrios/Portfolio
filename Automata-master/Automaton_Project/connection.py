from RegularExpresion import *
from NFA_Automata import *

class connection:
    
    def convertNfa(self):
        with open('json/NFA.json') as file:
                nfa = json.load(file)

        alphabet = nfa['alphabet']
        states = nfa['states']
        initalStates = nfa['initial_state']
        acceptingStates = nfa['accepting_states']
        transitions = nfa['transitions']

        print(nfa)
        #na = nfa_automata(alphabet,states,initalStates,acceptingStates,transitions)
        #na.executeConvrt(alphabet,states,initalStates,acceptingStates,transitions)

#ex = regularExpresion
#result = ex.executeExp('nfaEpsilon.txt')
#print(result)



