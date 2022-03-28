export default async function FetchFromAPI(endPoint: string, data?: any) {
  if (data) return await fetch("http://localhost:3000/api/"+endPoint,data).then((d) => d.json());
  else return await fetch("http://localhost:3000/api/"+endPoint).then((d) => d.json());
}
