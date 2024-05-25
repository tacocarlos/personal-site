import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { range, stripLeft } from '@/lib/utils';
import { ChangeEvent, ReactNode, useState } from 'react';
import parseMatrixSubmit, {
    MatrixFormResultType,
} from './EditableMatrixComponents/parseMatrixSubmit';

const MAX_MATRIX_WIDTH = 16;
const MAX_MATRIX_HEIGHT = 16;

type EditableMatrixParamsType = {
    handleSubmit: (eventData: MatrixFormResultType) => any;
};

function MatrixRow({ children }: { children: ReactNode }) {
    return <div className="flex space-x-1">{children}</div>;
}

export default function EditableMatrix({
    handleSubmit,
}: EditableMatrixParamsType) {
    const [width, setWidth] = useState(2);
    const [height, setHeight] = useState(2);

    const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
        const numberString = e.currentTarget.value;
        if (numberString === '') {
            setWidth(0);
            return;
        }

        const value = Number.parseInt(numberString);
        if (Number.isNaN(value)) {
            return;
        }

        if (value < MAX_MATRIX_WIDTH) {
            setWidth(value);
            return;
        }

        alert(
            `Larger matrix sizes not supported. Please use at most a ${MAX_MATRIX_HEIGHT}x${MAX_MATRIX_WIDTH} Matrix`
        );
        setWidth(MAX_MATRIX_WIDTH);
    };

    const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        let numberString = stripLeft(e.currentTarget.value, '0');
        if (numberString === '') {
            setHeight(0);
            return;
        }

        const value = Number.parseInt(numberString);
        if (Number.isNaN(value)) {
            return;
        }

        if (value < MAX_MATRIX_HEIGHT) {
            setHeight(value);
            return;
        }

        alert(
            `Larger matrix sizes not supported. Please use at most a ${MAX_MATRIX_HEIGHT}x${MAX_MATRIX_WIDTH} Matrix`
        );
        setHeight(MAX_MATRIX_HEIGHT);
    };

    return (
        <div className="my-5 w-full rounded-l bg-blue-700 p-2 ">
            <form
                onSubmit={(event) => {
                    return handleSubmit(parseMatrixSubmit(event));
                }}>
                <div className="flex space-x-3">
                    <span className="pp-1 rounded-xl bg-slate-600">
                        <Label className="px-2 text-white">
                            Matrix Height:{' '}
                        </Label>
                        <Input
                            className="rounded-t-none"
                            type="number"
                            onChange={handleHeightChange}
                            value={height}
                        />
                    </span>
                    <span className="pp-1 rounded-xl bg-slate-600">
                        <Label className="px-2 text-white">
                            Matrix Width:{' '}
                        </Label>
                        <Input
                            type="number"
                            onChange={handleWidthChange}
                            value={width}
                            className="rounded-t-none"
                        />
                    </span>
                </div>
                <br />
                <div className="flex flex-col space-y-2">
                    {range(height).map((i) => {
                        return (
                            <MatrixRow key={i}>
                                {range(width).map((j) => {
                                    return (
                                        <Input
                                            key={`${i} -- ${j}`}
                                            type="number"
                                            defaultValue={0}
                                            name={`${i} -- ${j}`}
                                        />
                                    );
                                })}
                            </MatrixRow>
                        );
                    })}
                </div>
                <br />
                <Button type="submit">Set Matrix</Button>
            </form>
        </div>
    );
}
