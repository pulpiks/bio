import { Reducer } from "redux"

export interface BioState {
    readonly title: string
}


const defaultState: BioState = {
    title: 'asdasd'
}

export const bio: Reducer<BioState> = (state = defaultState, action) => {
    switch (action.type) {
        default: return state
    }
}