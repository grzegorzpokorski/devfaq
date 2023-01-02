import { useQuery } from "@tanstack/react-query";
import { PAGE_SIZE } from "../lib/constants";
import { Level } from "../lib/level";
import { QuestionStatus } from "../lib/question";
import { Technology } from "../lib/technologies";
import { getAllQuestions } from "../services/questions.service";

export const useGetAllQuestions = ({
	page,
	technology,
	levels,
	status,
}: {
	page: number;
	technology: Technology | null;
	levels: Level[] | null;
	status: QuestionStatus;
}) => {
	const query = useQuery({
		queryKey: ["questions", { page, status, technology, levels }],
		queryFn: () =>
			getAllQuestions({
				limit: PAGE_SIZE,
				offset: (page - 1) * PAGE_SIZE,
				status,
				...(technology && { category: technology }),
				...(levels && { level: levels.join(",") }),
			}),
		keepPreviousData: true,
	});

	return query;
};
