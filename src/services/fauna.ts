import {Client, query as q} from 'faunadb'

type SaveOnFaunaParameters = {
  collectionName: string;
  refId: string ;
  stripe_customer_id: string
}


export const fauna = new Client({
  secret: process.env.FAUNADB_KEY as string,
  domain: 'db.fauna.com',
})


export async function queryOnFauna<T>(indexField: string, matchTarget: string) {
  return await fauna.query<T>(
    q.Get(
      q.Match(
        q.Index(indexField),
        q.Casefold(matchTarget)
      )
    )
  )
}

export async function queryForFieldOnFauna(
  indexField: string, 
  matchTarget: string,
  returnField: string
) {
  return await fauna.query(
    q.Select(
      returnField,
      q.Get(
        q.Match(
          q.Index(indexField),
          matchTarget
        )
      )
    )
  ) 
}


export async function saveOnFauna(collectionName: string, refId: string, stripe_customer_id: string) {
  await fauna.query(
    q.Update(
      q.Ref(q.Collection(collectionName), refId),
      {
        data: {
          stripe_customer_id  
        }
      }
    )
  )
}

export async function saveSubscriptionOnFauna(collectionName: string, subscription: any) {
  await fauna.query(
    q.Create(
      q.Collection(collectionName),
      {data: subscription}
    )
  )
}

export async function updateSubscriptionOnFauna(
  indexField: string,
  match: string,
  dataToReplace: any
) {
  await fauna.query(
    q.Replace(
      q.Select(
        'ref',
        q.Get(
          q.Match(
            q.Index(indexField),
            match
          )
        )
      ),
      {data: dataToReplace}
    )
  )
}