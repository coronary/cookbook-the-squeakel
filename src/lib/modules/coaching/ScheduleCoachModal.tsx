import * as React from "react";
import Modal from "@/lib/ui/modal/Modal";
import { User } from "../users/UserTypes";

interface ScheduleCoachModalProps {
	coach: User;
}

export const ScheduleCoachModal: React.FC<ScheduleCoachModalProps> = ({ coach }) => {
	return (
		<Modal open={() => null} setOpen={() => null}>
			<React.Fragment>{coach.discordUsername}</React.Fragment>
		</Modal>
	);
};

import {
	ChevronLeftIcon,
	ChevronRightIcon,
} from '@heroicons/react/20/solid';

const meetings = [
	{
		id: 1,
		date: 'January 10th, 2022',
		time: '5:00 PM',
		datetime: '2022-01-10T17:00',
		name: 'Leslie Alexander',
		imageUrl:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		location: 'Starbucks',
	},
	// More meetings...
];
const days = [
	{ date: '2021-12-27' },
	{ date: '2021-12-28' },
	{ date: '2021-12-29' },
	{ date: '2021-12-30' },
	{ date: '2021-12-31' },
	{ date: '2022-01-01', isCurrentMonth: true },
	{ date: '2022-01-02', isCurrentMonth: true },
	{ date: '2022-01-03', isCurrentMonth: true },
	{ date: '2022-01-04', isCurrentMonth: true },
	{ date: '2022-01-05', isCurrentMonth: true },
	{ date: '2022-01-06', isCurrentMonth: true },
	{ date: '2022-01-07', isCurrentMonth: true },
	{ date: '2022-01-08', isCurrentMonth: true },
	{ date: '2022-01-09', isCurrentMonth: true },
	{ date: '2022-01-10', isCurrentMonth: true },
	{ date: '2022-01-11', isCurrentMonth: true },
	{ date: '2022-01-12', isCurrentMonth: true, isToday: true },
	{ date: '2022-01-13', isCurrentMonth: true },
	{ date: '2022-01-14', isCurrentMonth: true },
	{ date: '2022-01-15', isCurrentMonth: true },
	{ date: '2022-01-16', isCurrentMonth: true },
	{ date: '2022-01-17', isCurrentMonth: true },
	{ date: '2022-01-18', isCurrentMonth: true },
	{ date: '2022-01-19', isCurrentMonth: true },
	{ date: '2022-01-20', isCurrentMonth: true },
	{ date: '2022-01-21', isCurrentMonth: true },
	{ date: '2022-01-22', isCurrentMonth: true, isSelected: true },
	{ date: '2022-01-23', isCurrentMonth: true },
	{ date: '2022-01-24', isCurrentMonth: true },
	{ date: '2022-01-25', isCurrentMonth: true },
	{ date: '2022-01-26', isCurrentMonth: true },
	{ date: '2022-01-27', isCurrentMonth: true },
	{ date: '2022-01-28', isCurrentMonth: true },
	{ date: '2022-01-29', isCurrentMonth: true },
	{ date: '2022-01-30', isCurrentMonth: true },
	{ date: '2022-01-31', isCurrentMonth: true },
	{ date: '2022-02-01' },
	{ date: '2022-02-02' },
	{ date: '2022-02-03' },
	{ date: '2022-02-04' },
	{ date: '2022-02-05' },
	{ date: '2022-02-06' },
];

const dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function classNames(...classes: (string | boolean | undefined)[]) {
	return classes.filter(Boolean).join(' ');
}

const Calendar: React.FC = (): React.ReactNode => {
	return (
		<div>
			<div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
				<div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
					<div className="flex items-center text-gray-900">
						<button
							type="button"
							className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
						>
							<span className="sr-only">Previous month</span>
							<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
						</button>
						<div className="flex-auto text-sm font-semibold">January</div>
						<button
							type="button"
							className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
						>
							<span className="sr-only">Next month</span>
							<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
						</button>
					</div>
					<div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
						{dayLetters.map((day: string, index: number) => <div key={`${day}-${index}`}>{day}</div>)}
					</div>
					<div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
						{days.map((day, dayIdx) => (
							<button
								key={day.date}
								type="button"
								className={classNames(
									'py-1.5 hover:bg-gray-100 focus:z-10',
									day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
									(day.isSelected || day.isToday) && 'font-semibold',
									day.isSelected && 'text-white',
									!day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
									!day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
									day.isToday && !day.isSelected && 'text-indigo-600',
									dayIdx === 0 && 'rounded-tl-lg',
									dayIdx === 6 && 'rounded-tr-lg',
									dayIdx === days.length - 7 && 'rounded-bl-lg',
									dayIdx === days.length - 1 && 'rounded-br-lg'
								)}
							>
								<time
									dateTime={day.date}
									className={classNames(
										'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
										day.isSelected && day.isToday && 'bg-indigo-600',
										day.isSelected && !day.isToday && 'bg-gray-900'
									)}
								>
									{day.date.split('-').pop()?.replace(/^0/, '')}
								</time>
							</button>
						))}
					</div>
					<button
						type="button"
						className="mt-8 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Add event
					</button>
				</div>
			</div>
		</div>
	);
};

