import React, { Dispatch, useState } from 'react';
import { BookmarkCheck, Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { Action, BioActions, State } from '../_bioReducer';

type BioSelectorParams = {
    state: State;
    dispatch: Dispatch<Action>;
};

export default function BioSelector({ state, dispatch }: BioSelectorParams) {
    const { bios, selectedBio } = state;
    const [open, setOpen] = useState(false);
    const menuChoices = bios;

    const updateSelection = (newChoiceID?: string) => {
        dispatch({
            kind: BioActions.SelectBio,
            params: {
                selectedBio: bios.find((bio) => bio.name === newChoiceID),
            },
        });
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
                <div
                    role="combobox"
                    aria-controls="bio-selector"
                    aria-expanded={open}
                    className="flex w-72 justify-between rounded-lg bg-slate-100 p-2 hover:bg-white">
                    {selectedBio ? (
                        <>
                            <span className="flex space-x-2">
                                <p>{selectedBio.name}</p>
                                {selectedBio.selected ? (
                                    <BookmarkCheck />
                                ) : null}
                            </span>
                        </>
                    ) : (
                        'Select Biography... '
                    )}
                    <ChevronsUpDown />
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <Command>
                    <CommandInput placeholder="Search For A Biography" />
                    <CommandList>
                        <CommandEmpty>No Biography Found</CommandEmpty>
                        <CommandGroup>
                            {menuChoices.map((choice) => {
                                return (
                                    <CommandItem
                                        key={choice.id}
                                        value={choice.name}
                                        onSelect={(newChoice) => {
                                            updateSelection(newChoice);
                                        }}
                                        className="mb-0.5">
                                        <Check
                                            className={cn(
                                                selectedBio?.id === choice.id
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                                'mr-2 h-4 w-4'
                                            )}
                                        />
                                        {choice.name}
                                        {choice.selected ? (
                                            <BookmarkCheck
                                                className="ml-auto"
                                                width={20}
                                            />
                                        ) : null}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
