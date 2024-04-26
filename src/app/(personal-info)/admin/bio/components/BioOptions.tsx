import { Dispatch } from 'react';
import { Action, BioActions, State } from '../_bioReducer';
import BioSelector from './BioSelector';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { setBioAsSelected } from '../_actions';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

export default function BioOptions({
    state,
    reducer,
}: {
    state: State;
    reducer: Dispatch<Action>;
}) {
    const { toast } = useToast();

    function handleDelete(id: string) {
        reducer({
            kind: BioActions.DeleteBio,
            params: {
                targetID: id,
            },
        });
    }

    function handleActivate() {
        if (
            state.selectedBio === undefined ||
            state.selectedBio.selected === true
        ) {
            toast({
                title: 'Bio already active',
            });
            return;
        }

        setBioAsSelected(state.selectedBio.id)
            .then(() => {
                reducer({
                    kind: BioActions.ActivateBio,
                    params: {
                        activeID: state.selectedBio?.id ?? '',
                    },
                });
            })
            .catch((reason) => {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Failed to set bio as active',
                    action: (
                        <ToastAction
                            altText="Try Again"
                            onClick={handleActivate}>
                            Try Again
                        </ToastAction>
                    ),
                });
            });
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row space-y-2  lg:space-x-3 justify-start">
                <BioSelector state={state} dispatch={reducer} />
                <Button className="bg-green-600 hover:bg-green-800">
                    New Bio
                </Button>
                <Button
                    className="bg-blue-600 hover:bg-blue-800 disabled:opacity-0"
                    disabled={state.selectedBio == null}>
                    Copy Bio
                </Button>
                <Button
                    className="bg-amber-600 hover:bg-amber-800 disabled:opacity-0 disabled:w-0 disabled:h-0"
                    disabled={state.selectedBio == null}
                    onClick={handleActivate}>
                    Set as Active Bio
                </Button>
                <div className="lg:w-full">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                className="lg:block lg:ml-auto w-full  lg:w-auto bg-red-600 hover:bg-red-800 disabled:opacity-0 disabled:w-0 disabled:h-0"
                                disabled={state.selectedBio == null}>
                                Delete Bio
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you sure you want to delete this bio?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div>
                                <p className="text-2xl">
                                    {state.selectedBio?.name}
                                </p>
                                <p>
                                    Updated At:{' '}
                                    {state.selectedBio?.updatedAt.toLocaleString()}
                                </p>
                                <p>
                                    Created At:{' '}
                                    {state.selectedBio?.createdAt.toLocaleString()}
                                </p>
                                <br />
                                <p>Bio ID: {state.selectedBio?.id}</p>
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => {
                                        console.log('Confirmed Delete');
                                    }}>
                                    Confirm
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </>
    );
}
