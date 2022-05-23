import { ActionReducer, MetaReducer } from "@ngrx/store";
import { BrowserService } from "../browser/browser.service";


export const cache = (reducer: ActionReducer<any>): ActionReducer<any>  => {
    return (state, action) => {
      const browserService = new BrowserService();
      browserService.saveInLocalStorage('state', state, 600);
      console.log('state', state);
      console.log('action', action);
   
      return reducer(state, action);
    };
  }
   
  export const metaReducers: MetaReducer<any>[] = [cache];
   