import { getAllBio } from './_actions';

import BioEditor from './components/BioEditor';
import BioSelector from './components/BioSelector';

import { bioReducer, BioActions, Action } from './_bioReducer';
import { Button } from '@/components/ui/button';
import { Dispatch, useEffect, useReducer } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import BioInfo from './components/BioInfo';
import { State } from './_bioReducer';
import BioOptions from './components/BioOptions';

function ManageBioSkeleton() {
    return <Skeleton className="w-1/2 h-96" />;
}

function BioSelection({
    state,
    reducer,
}: {
    state: State;
    reducer: Dispatch<Action>;
}) {
    return (
        <div className="space-x-5">
            <BioSelector state={state} dispatch={reducer} />
            <Button className="bg-green-600 hover:bg-white hover:text-black">
                New Bio
            </Button>
        </div>
    );
}

export default function ManageBio() {
    const [state, dispatch] = useReducer(bioReducer, {
        selectedBio: undefined,
        bios: [],
    });

    const { selectedBio, bios } = state;

    useEffect(() => {
        getAllBio().then((bios) => {
            const selectedBio = bios.find((value) => value.selected);
            dispatch({
                kind: BioActions.ReadBios,
                params: {
                    selectedBio: selectedBio,
                    bios: bios,
                },
            });
        });
    }, []);

    /** Outline of edit bio page
     *
     *  <Bio Selector> <New Bio Button>
     *  <Bio Editor>
     *  <Apply Changes (if bio is selected and changed)>
     *
     */

    let content = (
        <div className="w-3/4 m-auto" id="bio-container">
            <BioOptions state={state} reducer={dispatch} />;
        </div>
    );

    if (selectedBio !== undefined) {
        content = (
            <div className="m-auto w-3/4 space-y-2" id="bio-container">
                <BioOptions state={state} reducer={dispatch} />
                <BioInfo selectedBio={selectedBio} />
                {state !== undefined ? (
                    <BioEditor
                        state={state}
                        reducer={dispatch}
                        key={state.selectedBio?.id ?? null}
                    />
                ) : null}
            </div>
        );
    }

    return content;
}
