import DraggableComponent from "../../components/variables-section/variableorder/DraggableComponent";
import { SelectedVal } from "../../generators/ISparJson";
import ActionStore from "../ActionStore";

// This Action gets called when an SelctViewVar ("eye") Button is clicked
export function selectViewVar(
  actionStore: ActionStore,
  payload: { val: SelectedVal; selected: boolean, defaultLbl:SelectedVal },
  target:EventTarget
) {
    //delete Var since with the blockAction (click Event) it will be reselected
    if(!payload.selected) deleteVariable(actionStore,payload.val)
    if(payload.selected) addVariable(actionStore, payload.val)
}

export function readVariablesFromUI(actionStore: ActionStore) {
  //update the varnames
  actionStore.variables =
    actionStore.sparnatural.variableSection.variableOrderMenu.draggables.map(
      (d: DraggableComponent) => {
        return d.varName;
      }
    );
}

function addVariable(actionStore: ActionStore, val: SelectedVal) {
  if(actionStore.sparnatural.variableSection.variableOrderMenu.draggables.find((d:DraggableComponent)=>{
    return d.varName === val.variable.replace('?','')
  })) return // draggable already exists
  //add a draggable
  actionStore.sparnatural.variableSection.variableOrderMenu.addDraggableComponent(
    val
  );
  //update stateobject
  actionStore.variables.push(val.variable.replace('?',''))
  //update the varnames
  readVariablesFromUI(actionStore);
}

function deleteVariable(actionStore: ActionStore, val: SelectedVal) {
  //remove a draggable
  actionStore.sparnatural.variableSection.variableOrderMenu.removeDraggableByVarName(
    val.variable
  );
  //update the varnames
  readVariablesFromUI(actionStore);
  //update the variables in the state
  actionStore.variables.filter((v)=> v!=val.variable.replace('?',''))
}
