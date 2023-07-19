import { GETSEARCH } from 'api';
import { ISearch } from 'interface/search';
import { useState, useEffect, useCallback } from 'react';

interface Props {
  searchValue: string;
}

const useSearchData = ({ searchValue }: Props) => {
  const [searchData, setSearchData] = useState<ISearch[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSearch = useCallback(async () => {
    try {
      setIsLoading(true);
      if (searchValue) {
        const { data } = await GETSEARCH(searchValue);
        setSearchData(data);
        console.info('calling api');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [searchValue]);

  useEffect(() => {
    getSearch();
  }, [getSearch]);

  return { isLoading, searchData };
};

export default useSearchData;
