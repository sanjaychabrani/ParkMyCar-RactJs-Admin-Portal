import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import './TotalIncome.css';
import Chart from 'react-apexcharts';
import { db } from './firebase';
import UserContext from './UserContext';

function TotalIncome() {
  const [slotIncomes, setSlotIncomes] = useState([]);
  const loggedInEmail = useContext(UserContext);

  useEffect(() => {
    const fetchIncomes = async () => {
      const parkingLocationsRef = collection(db, 'parkingLocations');
      const querySnapshot = await getDocs(
        query(parkingLocationsRef, where('email', '==', loggedInEmail))
      );

      if (!querySnapshot.empty) {
        const parkingLocation = querySnapshot.docs[0].data();
        const owner = parkingLocation.owner;

        const slotsRef = collection(db, 'userBookSlots');
        const querySnapshot2 = await getDocs(
          query(slotsRef, where('ParkingName', '==', owner))
        );

        const slots = querySnapshot2.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const incomesBySlot = {};
        slots.forEach((slot) => {
          const { slotNo, charges } = slot;
          if (charges) {
            if (incomesBySlot[slotNo]) {
              incomesBySlot[slotNo] += charges;
            } else {
              incomesBySlot[slotNo] = charges;
            }
          }
        });

        setSlotIncomes(Object.entries(incomesBySlot));
      }
    };

    fetchIncomes();
  }, [loggedInEmail]);

  const optionsPie = {
    title: {
      text: 'Income Distribution',
      align: 'center',
      style: {
        fontSize: '16px',
        color: '#666'
      }
    },
    labels: slotIncomes.map(([slotNo]) => slotNo),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const seriesPie = slotIncomes.map(([, income]) => income);

  const optionsBar = {
    chart: {
      id: 'income-bar-chart',
    },
    title: {
      text: 'Income Per Parking Slot',
      align: 'center',
      style: {
        fontSize: '16px',
        color: '#666'
      }
    },
    xaxis: {
      categories: slotIncomes.map(([slotNo]) => slotNo),
      title: {
        text: 'Parking Slot Number',
      },
    },
    yaxis: {
      title: {
        text: 'Income ($)',
      },
    },
  };

  const seriesBar = [
    {
      name: 'Income',
      data: slotIncomes.map(([, income]) => income),
    },
  ];

  return (
    <div className="total-income">
      <div className="chart-container container-two">
        <Chart options={optionsPie} series={seriesPie} type="pie" width="100%" />
      </div>
      <div className="chart-container container-two">
        <Chart options={optionsBar} series={seriesBar} type="bar" width="100%" />
      </div>
    </div>
  );
}

export default TotalIncome;
