import { formatDistanceToNow } from "date-fns";

console.log(formatDistanceToNow(new Date(Date.now() + 15 * 60 * 1000), { addSuffix: true }));