import { dehydrate } from 'react-query/hydration';
import { GetServerSideProps } from 'next';
import { QueryClient, useQuery } from 'react-query';

import getOrg from '../../fetching/getOrg';
import OrgLayout from '../../components/layout/OrgLayout';
import { PageWithLayout } from '../../types';
import { scaffold } from '../../utils/next';

export const getServerSideProps : GetServerSideProps = scaffold(async (context) => {
    const queryClient = new QueryClient();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { orgId } = context.params!;

    await queryClient.prefetchQuery(['org', orgId], getOrg(orgId as string));

    const orgState = queryClient.getQueryState(['org', orgId]);

    if (orgState?.status === 'success') {
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
                orgId,
            },
        };
    }
    else {
        return {
            notFound: true,
        };
    }
});

type OrgPageProps = {
    orgId: string;
};

const OrgPage : PageWithLayout<OrgPageProps> = (props) =>{
    const { orgId } = props;
    const orgQuery = useQuery(['org', orgId], getOrg(orgId));

    return (
        <>
            <h1>{ orgQuery.data?.title }</h1>
        </>
    );
};

OrgPage.getLayout = function getLayout(page, props) {
    return (
        <OrgLayout mainPage={ true } orgId={ props.orgId as string }>
            { page }
        </OrgLayout>
    );
};

export default OrgPage;