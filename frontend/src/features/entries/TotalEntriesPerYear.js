function TotalEntriesPerYear({ entries }) {
  let entriesPerYear = {};

  for (const entry of entries) {
    const year = new Date(entry.createdAt).getFullYear();
    if (entriesPerYear[year]) {
      entriesPerYear[year]++;
    } else {
      entriesPerYear[year] = 1;
    }
  }

  return (
    <>
      <p>Total entries per year:</p>
      {[...Object.keys(entriesPerYear)].map((k) => (
        <p key={k}>
          {k}: {entriesPerYear[k]}
        </p>
      ))}
    </>
  );
}

export default TotalEntriesPerYear;
