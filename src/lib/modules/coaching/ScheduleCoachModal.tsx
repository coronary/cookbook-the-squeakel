import * as React from "react";
import Modal from "@/lib/ui/modal/Modal";
import { User } from "../users/UserTypes";

interface ScheduleCoachModalProps {
	coach: User;
}

export const ScheduleCoachModal: React.FC<ScheduleCoachModalProps>   = ({ coach }) => {
	return ( 
		<Modal open={() => null} setOpen={() => null}>
			<React.Fragment>{ coach.discordUsername }</React.Fragment>
		</Modal> 
	);
};
