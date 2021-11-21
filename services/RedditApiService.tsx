import {
  ApiResponse,
  errorResponse,
  successfulResponse,
} from '../utilities/ApiUtil';
import {getAsync} from '../utilities/RestUtil';

export const REDDIT_ERROR_CODES = {
  UNKNOWN: 'unknown',
};

export interface Post {
  title: string;
  body: string;
  link: string;
  type: string;
}

export const getBestAsync = async (): Promise<ApiResponse<Post[]>> => {
  try {
    const response = await getAsync('https://reddit.com/best.json');
    if (response.json) {
      const result: Post[] = response.json.data.children.map((x: any) => {
        return {
          title: x.data.title,
          body: x.data.selftext,
          link: x.data.url,
          type: x.data.post_hint,
        };
      });
      return successfulResponse(result);
    }
  } catch {}
  return errorResponse(REDDIT_ERROR_CODES.UNKNOWN);
};
