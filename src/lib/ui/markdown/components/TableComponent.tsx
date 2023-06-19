export const TableComponent = {
  table: (props) => (
    <table class="w-full max-w-4xl divide-y divide-gray-700" {...props} />
  ),
  tbody: (props) => <tbody class="divide-y divide-gray-800" {...props} />,
  th: (props) => (
    <th
      scope="col"
      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
      {...props}
    />
  ),
  td: (props) => (
    <td
      class="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"
      {...props}
    />
  ),
};
