import { Link } from "raviger";
import React, { useEffect, useState } from "react";
import { submissionResultType } from "../../types/ApiTypes";
import { getSubmissionValue } from "../../util/ApiUtils";

async function getFormSubmissionValue(
  formId: string,
  setResults: React.Dispatch<React.SetStateAction<submissionResultType | null>>
) {
  const data = await getSubmissionValue(formId);
  setResults(data);
}

function Result(props: { formId: string }) {
  const { formId } = props;
  const [results, setResults] = useState<null | submissionResultType>(null);

  useEffect(() => {
    getFormSubmissionValue(formId, setResults);
  }, [formId]);

  return (
    <div>
      <h1 className="text-3xl py-4">Result</h1>
      {results === null || results?.count === 0 ? (
        <h1 className="text-xl text-center font-semibold">No results found</h1>
      ) : (
        <>
          <h1 className="text-gray-500">Id. Label and data</h1>
          {console.log(results?.results.form)}
        </>
      )}
      <div className="flex justify-between w-full mt-5">
        <Link
          className="text-white w-full bg-blue-500 mx-2 px-4 py-2 text-center rounded-lg hover:bg-blue-600 border-2 border-transparent hover:border-black"
          type="button"
          href="/"
        >
          Home 🏠
        </Link>
        <Link
          className="text-white w-full bg-blue-500 mx-2 px-4 py-2 text-center rounded-lg hover:bg-blue-600 border-2 border-transparent hover:border-black"
          type="button"
          href={`/form/${formId}`}
        >
          Form 📑
        </Link>
      </div>
    </div>
  );
}

export default Result;
