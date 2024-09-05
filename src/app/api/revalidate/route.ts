/* eslint-disable @typescript-eslint/naming-convention */
import {revalidatePath, revalidateTag} from 'next/cache';
import {headers} from 'next/headers';
import {type NextRequest} from 'next/server';

console.log('Worker started');
/**
 * Constants for HTTP Status codes.
 */
const STATUS_CODES = {
  UNAUTHORIZED: 401,
  PRECONDITION_FAILED: 412,
  INTERNAL_SERVER_ERROR: 500,
};

const {REVALIDATE_SECRET_KEY} = process.env;

if (!REVALIDATE_SECRET_KEY) {
  throw new Error('Missing REVALIDATE_SECRET_KEY environment variable');
}

type PUTRequestBody = {
  paths?: string[];
  tags?: string[];
};
export async function PUT(request: NextRequest) {
  console.log('Request2:', request);
  const {paths, tags}: PUTRequestBody =
    (await request.json()) as PUTRequestBody;

  console.log('Received paths:', paths);
  console.log('Received tags:', tags);

  const headersList = headers();
  const authorizationHeader = headersList.get('authorization');

  console.log('Authorization header:', authorizationHeader);
  console.log('Secret key:', REVALIDATE_SECRET_KEY);

  if (authorizationHeader !== `Bearer ${REVALIDATE_SECRET_KEY}`) {
    console.error(`Invalid token: ${authorizationHeader}`);
    return new Response(`Invalid token`, {status: STATUS_CODES.UNAUTHORIZED});
  }

  if (!paths && !tags) {
    console.error(`Precondition Failed: Missing paths and tags`);
    return new Response(`Precondition Failed: Missing paths and tags`, {
      status: STATUS_CODES.PRECONDITION_FAILED,
    });
  }

  let revalidatePaths: string[] = [];
  let correctTags: string[] = [];

  if (paths) {
    revalidatePaths = paths.filter((path) => path.startsWith('/'));

    console.log('Filtered correct paths:', revalidatePaths);
  }

  if (tags) {
    correctTags = tags.filter((tag) => typeof tag === 'string');
    console.log('Filtered correct tags:', correctTags);
  }

  try {
    for (const path of revalidatePaths) {
      revalidatePath(path);
    }

    for (const tag of correctTags) {
      revalidateTag(tag);
    }

    console.log(
      `${new Date().toJSON()} - Paths and tags revalidated: ${revalidatePaths.join(
        ', ',
      )} and ${correctTags.join(', ')}`,
    );

    return new Response(
      JSON.stringify({
        revalidated: true,
        message: `Paths and tags revalidated: ${revalidatePaths.join(
          ', ',
        )} and ${correctTags.join(', ')}`,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error: unknown) {
    const message: string =
      error instanceof Error ? error.message : 'An error occurred';

    console.error('Revalidation error:', message);
    return new Response(message, {
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
    });
  }
}
