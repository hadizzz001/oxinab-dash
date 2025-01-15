import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../mongodb';
import { ObjectId } from 'mongodb';




export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
  const id = req.query.pid;
  const item = req.body.state

    const product = await client.db("Power").collection("Posts")
    .updateOne({_id:new ObjectId(`${id}`)} , {$set:{title:item.title, description:item.description, images:item.images}});
    if (product && product?.modifiedCount !== 0) {
         return res.status(200).json({success:true});
        }
}
return res.status(400).json({success:false});

}
