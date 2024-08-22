import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ReactECharts from 'echarts-for-react';
import { User, SleepEntry } from '../types';

const fetchUsers = async () => {
  const { data } = await axios.get('/api/users');
  return data;
};

const fetchUserSleepData = async (userName: string): Promise<SleepEntry[]> => {
  const { data } = await axios.get(`/api/sleep-entries/${userName}/weekly-summary`);
  return data;
};

const SleepTable: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const { data: users = [], isLoading: isUsersLoading, isError: isUsersError, error: usersError } = useQuery<User[], Error>(['users'], fetchUsers);
  const { data: sleepData, isLoading: isSleepDataLoading, isError: isSleepDataError, error: sleepDataError } = useQuery<SleepEntry[], Error>(
    ['userSleepData', selectedUser],
    () => fetchUserSleepData(selectedUser!),
    { enabled: !!selectedUser }
  );

  if (isUsersLoading) return <div>Loading sleep data...</div>;
  if (isUsersError) return <div>Error loading sleep data: {usersError.message}</div>;
  if (!Array.isArray(users) || users.length === 0) return <div>No users found.</div>;

  const getOption = () => {
    if (!sleepData) return {};

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    return {
      title: {
        text: `Weekly Sleep Duration for ${selectedUser}`,
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        type: 'category',
        data: sleepData.map((entry: any) => formatDate(entry.date)),
      },
      yAxis: {
        type: 'value',
        name: 'Hours',
      },
      series: [
        {
          name: 'Sleep Duration',
          type: 'bar',
          data: sleepData.map((entry: any) => entry.sleepDuration),
          itemStyle: {
            color: 'rgba(75, 192, 192, 0.8)',
          },
        },
      ],
    };
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Sleep Data</h2>
      <table className="min-w-full bg-white mb-8">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Gender</th>
            <th className="py-2 px-4 border-b">Entries</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.name} onClick={() => setSelectedUser(user.userName)} className="cursor-pointer hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{user.userName}</td>
              <td className="py-2 px-4 border-b">{user.gender}</td>
              <td className="py-2 px-4 border-b">{user.entryCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && isSleepDataLoading && <div>Loading sleep data for {selectedUser}...</div>}
      {isSleepDataError && <div>Error loading sleep data: {sleepDataError.message}</div>}

      {sleepData && (
        <div className="w-full mt-8 p-4">
          <ReactECharts option={getOption()} style={{ height: '400px', width: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default SleepTable;