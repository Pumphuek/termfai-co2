import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  console.log("true money result post");
  console.log(`${process.env.NEXT_PUBLIC_URL}?t=tmw&b=${params.id}`);
  redirect(`${process.env.NEXT_PUBLIC_URL}?t=tmw&b=${params.id}`);
}
