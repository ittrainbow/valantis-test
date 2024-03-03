Store: MobX
Styling: Sass
API requests via axios & axios-retry

Behavior:

Initial fetch - 100 unique ids fetched, then 100 items fetched

If pagination leads to the last page - additional 100 items fetched

In case of special request (brand or search string specified) - all appropriate ids fetched,
then duplicates are filtered and corresponding items fetched,
then we concat those items to locally stored ones

If no brand item specified in item data - we replace it with 'Valantis'

Images are attached depending on id and do not represent the real product
