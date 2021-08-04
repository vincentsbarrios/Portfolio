import React from 'react';
import {RRForm} from "../containers/referenceForm/referenceFormModels";

const StepsContext = React.createContext<RRForm>({} as RRForm);

export const StepsProvider = StepsContext.Provider;
export const StepsConsumer = StepsContext.Consumer;


export default StepsContext;