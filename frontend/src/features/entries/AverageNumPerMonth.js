function AverageNumPerMonth({ entries }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let entriesPerMonth = [
    {
      years: [],
      count: 0,
    },
    {
      years: [],
      count: 0,
    },
    {
      years: [],
      count: 0,
    },
    {
      years: [],
      count: 0,
    },
    {
      years: [],
      count: 0,
    },
    {
      years: [],
      count: 0,
    },
    {
      years: [],
      count: 0,
    },
    {
      years: [],
      count: 0,
    },
    {
      years: [],
      count: 0,
    },
    {
      years: [],
      count: 0,
    },
    {
      years: [],
      count: 0,
    },
    {
      years: [],
      count: 0,
    },
  ];

  for (const entry of entries) {
    const month = new Date(entry.createdAt).getMonth();
    const year = new Date(entry.createdAt).getFullYear();
    if (!entriesPerMonth[month].years.includes(year)) {
      entriesPerMonth[month].years.push(year);
      entriesPerMonth[month].count++;
    } else {
      entriesPerMonth[month].count++;
    }
  }

  return (
    <>
      <p>Average number of entries per month</p>
      <table>
        <tbody>
          {entriesPerMonth?.map((e, i) => (
            <tr key={i}>
              <td>{months[i]}</td>
              <td>{e.count / e.years.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AverageNumPerMonth;
