import { Biography } from '@prisma/client';
import { setBioAsSelected } from './_actions';

type BioCollectionType = Biography[];

export type State = {
    selectedBio?: Biography;
    bios: BioCollectionType;
};

export const BioActions = {
    SelectBio: 'select-bio',
    UpdateBio: 'update-bio',
    ReadBios: 'read-bios',
    DeleteBio: 'delete-bio',
    CloneBio: 'clone-bio',
    ActivateBio: 'activate-bio',
} as const;
export type BioActionValue = (typeof BioActions)[keyof typeof BioActions];

//! Triggers when user chooses a bio in the combobox selector
type SelectParams = { selectedBio?: Biography | undefined };
type SelectAction = { kind: typeof BioActions.SelectBio; params: SelectParams };

//! Triggers when user sets a bio as the "active" (shown in `/about`) bio
type ActivateParams = { activeID: string };
type ActivateAction = {
    kind: typeof BioActions.ActivateBio;
    params: ActivateParams;
};

//! Triggers when a user modifies the content/name of a bio and applies the change
type UpdateParams = Omit<Biography, 'createdAt' | 'updatedAt'>;
type UpdateAction = { kind: typeof BioActions.UpdateBio; params: UpdateParams };

//! An init action to read the bios from the database
type ReadParams = { selectedBio?: Biography; bios: Biography[] };
type ReadAction = { kind: typeof BioActions.ReadBios; params: ReadParams };

type DeleteParams = { targetID: string };
type DeleteAction = { kind: typeof BioActions.DeleteBio; params: DeleteParams };

type CloneParams = { sourceBio?: Biography; newBioName: string };
type CloneAction = { kind: typeof BioActions.CloneBio; params: CloneParams };

export type Action =
    | SelectAction
    | UpdateAction
    | ReadAction
    | DeleteAction
    | CloneAction
    | ActivateAction;

type ActionFuncType<ParamsType> = (
    prevState: State,
    params: ParamsType
) => State;

function executeAction<ParamsType>(
    state: State,
    action: Action,
    intended: BioActionValue,
    actionFunction: ActionFuncType<ParamsType>
): State {
    if (action.kind !== intended) {
        throw new Error('Invalid Action Type: ' + action.kind);
    }

    // since we know that the action kind is unique to the param type,
    // should be fine to assert its type
    return actionFunction(state, action.params as ParamsType);
}

export function bioReducer(state: State, action: Action): State {
    const params: [State, Action, BioActionValue] = [
        state,
        action,
        action.kind,
    ];

    switch (action.kind) {
        case BioActions.SelectBio:
            return executeAction(...params, selectBio);
        case BioActions.UpdateBio:
            return executeAction(...params, updateBio);
        case BioActions.ReadBios:
            return executeAction(...params, readBios);
        case BioActions.DeleteBio:
            return executeAction(...params, deleteBio);
        case BioActions.CloneBio:
            return executeAction(...params, cloneBio);
        case BioActions.ActivateBio:
            return executeAction(...params, activateBio);
    }
}

function selectBio(prevState: State, params: SelectParams): State {
    return { ...prevState, selectedBio: params.selectedBio };
}

function activateBio(prevState: State, params: ActivateParams): State {
    const { bios: oldBios } = prevState;

    let selectedBioIndex: number | undefined = undefined;
    const newBios = oldBios.map((bio, idx) => {
        if (bio.id === params.activeID) {
            selectedBioIndex = idx;
            return {
                ...bio,
                selected: true,
                updatedAt: new Date(),
            };
        }

        return {
            ...bio,
            selected: false,
            updatedAt: new Date(),
        };
    });

    return {
        bios: newBios,
        selectedBio: newBios.at(selectedBioIndex ?? newBios.length + 1),
    };
}

function updateBio(prevState: State, params: UpdateParams): State {
    let newBioIndex = undefined;
    const newBios = prevState.bios.map((bio, idx) => {
        if (bio.id === params.id) {
            newBioIndex = idx;
            return {
                ...bio,
                content: params.content,
                updatedAt: new Date(),
            };
        }

        return bio;
    });
    return {
        //! if  new bio is somehow not in the new bios array,
        //! get an out of bounds index to make Array.at() return undefined
        selectedBio: newBios.at(newBioIndex ?? newBios.length + 1),
        bios: newBios,
    };
}

function readBios(prevState: State, params: ReadParams): State {
    return {
        selectedBio: params.selectedBio,
        bios: params.bios,
    };
}

function deleteBio(prevState: State, params: DeleteParams): State {
    console.log('DELETE-BIO');
    console.log(params);
    return {
        ...prevState,
        selectedBio: undefined,
    };
}

function cloneBio(prevState: State, params: CloneParams): State {
    console.log('CLONE-BIO');
    console.log(params);
    return prevState;
}
