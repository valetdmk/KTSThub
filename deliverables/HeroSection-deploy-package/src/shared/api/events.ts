import type { Event } from "../../entities/event/model";
import { api } from "./base";
import { apiPaths } from "./endpoints";

type ScheduleSkillDto = {
    id: number;
    name: string;
    category: string;
};

type ScheduleDto = {
    id: number;
    name: string;
    briefDescription?: string;
    description?: string;
    startDateTime: string;
    endDateTime: string;
    skills?: ScheduleSkillDto[];
};

function mapScheduleToEvent(schedule: ScheduleDto): Event {
    return {
        id: schedule.id,
        title: schedule.name,
        type: schedule.briefDescription ?? "EVENT",
        description: schedule.description ?? "",
        startDate: schedule.startDateTime,
        endDate: schedule.endDateTime,
        stack: schedule.skills?.map((skill) => skill.name) ?? [],
    };
}

export const eventsApi = {
    getEvents: async (): Promise<Event[]> => {
        const response = await api.get<ScheduleDto[]>(apiPaths.events.collection);
        return response.data.map(mapScheduleToEvent);
    },

    getEventById: async (id: number): Promise<Event> => {
        const response = await api.get<ScheduleDto>(apiPaths.events.scheduleById(id));
        return mapScheduleToEvent(response.data);
    },
};
