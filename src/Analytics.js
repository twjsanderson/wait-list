import { useEffect, useState, useContext } from 'react';
import { toJS } from 'mobx';
import { useObserver } from 'mobx-react';
import {XYPlot, XAxis, YAxis, VerticalBarSeries } from 'react-vis';

// context 
import { StoreContext } from './App';

const Analytics = () => {
    const [dailyList, setDailyList] = useState([{ x: '', y: 0}]);

    const store = useContext(StoreContext);
    const waitList = toJS(store.waitList);

    useEffect(() => {
        for (let guest of waitList) {
            for (let daily of dailyList) {
                if (guest.dateTimeStamp.toDateString().slice(0, 3) === daily.x) {
                    setDailyList([{ x: guest.dateTimeStamp.toDateString().slice(0, 3), y: daily.y++ }])
                } else {
                    setDailyList([ ...dailyList, { x: guest.dateTimeStamp.toDateString().slice(0, 3), y: 1 }])
                }
            }
        }
    }, [])


    console.log(dailyList)

    return useObserver(() => (
        <section className='m-3'>
            <h1 className='mx-2'>Daily</h1>
            <XYPlot height={500} width={300} xType='ordinal'>
                <XAxis/>
                <YAxis />
                <VerticalBarSeries 
                    data={dailyList}
                />
            </XYPlot>
            {/* <p>{store.allowed}</p> */}
            {/* {
                waitList.map(guest => {
                    return <li key={guest.phone}>{guest.name}</li>
                })
            } */}
        </section>
    ));
};

export default Analytics;