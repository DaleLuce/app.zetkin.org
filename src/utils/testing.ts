import { ZetkinEvent } from 'types/zetkin';

const dummyEvent : ZetkinEvent = {
    activity: {
        title: 'Active activity',
    },
    campaign: {
        id: 1,
        title: 'Testcampaign Title',
    },
    contact: null,
    end_time: '2022-06-16T09:00:00+00:00',
    id: 1,
    info_text: 'Info text is informational',
    location: {
        id: 1,
        lat: 51.192702,
        lng: 12.284873,
        title: 'Dorfplatz',
    },
    num_participants_available: 3,
    num_participants_required: 2,
    organization: {
        id: 1,
        title: 'My Organization',
    },
    start_time: '2022-06-16T07:00:00+00:00',
    title: undefined,
    url: undefined,
};

interface MockEventProps {
    end_time: string;
    start_time: string;
}

export const createMockEvent = ( { end_time, start_time } : MockEventProps ) : ZetkinEvent => {
    return {
        ...dummyEvent,
        end_time: end_time,
        start_time: start_time,
    };
};
