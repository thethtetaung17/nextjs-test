import { useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { COUNTRIES, NOTI_SUBSCRIPTION } from "../graphql/schemas";

const Home = ({countries}: any) => {
  const { data } = useQuery(COUNTRIES);
  const notiSubscription = useSubscription(NOTI_SUBSCRIPTION);
  const [notifications, setNotifications] = useState<any>([]);

  console.log(notiSubscription)
  useEffect(() => {
    console.log(notiSubscription.data)
    if(notiSubscription.data?.newNotification) {
      setNotifications([...notifications, notiSubscription.data?.newNotification])
    }
  },[notiSubscription.data])

  return (
    <>
      <div className="flex flex-col h-screen w-full">
        {
          data?.countries &&
          // .map((country:any, index: number) => (
            <div> 
              <h2> { data?.countries[0].name } </h2>
              <p> {data?.countries[0].code} - {data?.countries[0].emoji}</p>
            </div>
          // ))
        }
        {
          JSON.stringify(notifications)
        }
      </div>
    </>
  )
}

// export async function getStaticProps() {
//   const { data } = await client.query({
//     query: gql`
//       query Countries {
//         countries {
//           code
//           name
//           emoji
//         }
//       }
//     `,
//   });

//   return {
//     props: {
//       countries: data.countries.slice(0, 4),
//     },
//  };
// }

export default Home;