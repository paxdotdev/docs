#!/bin/bash

set -e
npm run build
aws --profile=pax s3 sync --acl=public-read ./out/ s3://docs.pax.dev/
aws --profile=pax cloudfront create-invalidation --distribution-id=E2EYK7TMGOPCYY --paths "/*"