import React from 'react';
import { InlineWidget } from 'react-calendly';


//make the inline wwidget typed

interface CalendarProps {
    url: string;
}


const Calendar: React.FC<CalendarProps> = ({
    url,
}) => {

    return(
        <div>
            <InlineWidget url={}> </InlineWidget>
        </div>
    );
};

export default Calendar;