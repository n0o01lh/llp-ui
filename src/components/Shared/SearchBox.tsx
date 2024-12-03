import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";

interface SearchBoxProps {
  searchValue: string;
  onChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = (props) => {
  const { searchValue, onChange } = props;

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900">
      <Card className="w-full">
        <div className="relative">
          <SearchIcon className="absolute left-2 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Start typing to search..."
            value={searchValue}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            className="pl-8"
          />
        </div>
      </Card>
    </div>
  );
};

export default SearchBox;
