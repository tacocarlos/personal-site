import { Project } from '@data/Project';

export type State = {
    selectedProject?: Project;
};

export const ProjectActions = {
    UpdateProject: 'update-project',
    DeleteProject: 'delete-project',
    CreateProject: 'create-project',
    HideProject: 'hide-project',
    ChangeProjectFeature: 'change-project-feature',
    SelectProject: 'select-project',
} as const;
export type ProjectActionValue =
    (typeof ProjectActions)[keyof typeof ProjectActions];

type UpdateParams = { selectedProject?: Project };
type UpdateAction = {
    kind: typeof ProjectActions.UpdateProject;
    params: UpdateParams;
};

type SelectParams = { selectedProject?: Project };
type SelectAction = {
    kind: typeof ProjectActions.SelectProject;
    params: SelectParams;
};

export type Action = UpdateAction | SelectAction;
type ActionFuncType<ParamsType> = (
    prevState: State,
    params: ParamsType
) => State;

function executeAction<ParamsType>(
    state: State,
    action: Action,
    actionFunction: ActionFuncType<ParamsType>
) {
    return actionFunction(state, action.params as ParamsType);
}

export function projectReducer(state: State, action: Action): State {
    switch (action.kind) {
        case ProjectActions.UpdateProject:
            return executeAction(state, action, updateProject);
        case ProjectActions.SelectProject:
            return executeAction(state, action, selectProject);
        default:
            return state;
    }
}

function updateProject(prevState: State, params: UpdateParams): State {
    const newProject = params.selectedProject;
    return {
        selectedProject: newProject,
    };
}

function selectProject(prevState: State, params: UpdateParams): State {
    return {
        selectedProject: params.selectedProject,
    };
}
