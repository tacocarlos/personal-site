import { FormType } from './FormSchema';
import { State, Action } from '../../projectActions';
import { Dispatch } from 'react';

export type FormItemProps = {
    form: FormType;
    state: State;
    reducer: Dispatch<Action>;
};
