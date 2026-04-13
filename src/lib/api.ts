

export const submitEnquiry = async (data: any) => {
  const res = await fetch("/api/form/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};