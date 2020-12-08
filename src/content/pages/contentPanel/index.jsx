import React from "react";

import { getExtensionURL } from "utils/helper";
import { contentPanelManager } from "../../index";
import SendMessage from "utils/sendMessages";

import { Box, Grid, Paper, Typography, Avatar } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { styled, makeStyles } from "@material-ui/core/styles";

import { default as SampleProfile } from "./../../../../sample-json/sample-profile-info.json";

const SpacedPaper = styled(Paper)(spacing);
const SpacedGrid = styled(Grid)(spacing);

const useStyles = makeStyles({
    avatar: {
        width: "96px",
        height: "96px",
        marginBottom: "16px",
    },
    title: {
        marginBottom: "0.25px",
    },
    subTitle: {},
    description: {},
    descValue: {
        fontWeight: "bold",
    },
    descIcon: {
        verticalAlign: "middle",
    },
});

export const ContentPanel = (props) => {
    const [contact, setContact] = React.useState();
    const [userInfo, setUserInfo] = React.useState();
    const [isLoading, setLoading] = React.useState(false);

    const cls = useStyles();

    React.useEffect(() => {
        const { emailAddress } = contact || {};
        if (emailAddress) {
            setLoading(true);
            SendMessage("GET_INFO_BY_EMAIL", { emailAddress })
                .then((result) => {
                    setLoading(false);
                    //! For testing
                    setUserInfo(SampleProfile);
                    return;
                    if (result) {
                        // setUserInfo(result.data);
                    } else {
                        setUserInfo(null);
                    }
                })
                .catch((err) => {
                    console.log("===== Error in Get UserInfo => ", err);
                    setLoading(false);
                    setUserInfo(null);
                });
        }
    }, [contact]);

    contentPanelManager.hoverEmailAddress = (hovered) => {
        setContact(hovered);
    };

    if (isLoading) {
        return (
            <Box p={1}>
                <SpacedGrid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <SpacedPaper p={2}>
                        <Typography variant="subtitle2">Loading!</Typography>
                    </SpacedPaper>
                </SpacedGrid>
            </Box>
        );
    }

    console.log("~~~~~~~~~`", userInfo, SampleProfile);

    if (!userInfo || Object.keys(userInfo).length === 0) {
        return (
            <Box p={1}>
                <SpacedGrid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <SpacedPaper p={2}>
                        <Typography variant="subtitle2">
                            Could not found!
                        </Typography>
                    </SpacedPaper>
                </SpacedGrid>
            </Box>
        );
    }

    const {
        profile_pic,
        first_name,
        last_name,
        emails,
        job_title,
        company_name,
        phone_numbers,
        city,
        state,
        country_code,
        twitter,
        github,
        facebook,
        linkedin,
        instagram,
    } = userInfo || {};

    return (
        <Box p={1}>
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
            >
                <SpacedPaper p={2} mb={1}>
                    <Typography variant="h6">Contact Details</Typography>
                </SpacedPaper>

                <SpacedPaper p={2}>
                    <SpacedGrid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <SpacedGrid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            mb={2}
                        >
                            <Avatar
                                alt={`${first_name.charAt(
                                    0
                                )} ${last_name.charAt(0)}`}
                                src={profile_pic}
                                className={cls.avatar}
                            />
                            <Typography
                                variant="subtitle1"
                                align="center"
                                className={cls.title}
                            >
                                {`${first_name} ${last_name}`}
                            </Typography>
                            {job_title && (
                                <Typography
                                    variant="subtitle2"
                                    align="center"
                                    className={cls.subTitle}
                                >
                                    {job_title}
                                </Typography>
                            )}
                            {emails && (
                                <Typography
                                    variant="subtitle2"
                                    align="center"
                                    className={cls.title}
                                >
                                    {emails.join(", ")}
                                </Typography>
                            )}
                        </SpacedGrid>
                        {company_name && (
                            <SpacedGrid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                                padding={0.5}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{
                                        width: "1rem",
                                        height: "1rem",
                                        fontSize: "1rem",
                                        verticalAlign: "text-bottom",
                                        marginRight: "10px",
                                    }}
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                    ></path>
                                    <rect
                                        x="3"
                                        y="7"
                                        width="18"
                                        height="13"
                                        rx="2"
                                    ></rect>
                                    <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"></path>
                                    <line
                                        x1="12"
                                        y1="12"
                                        x2="12"
                                        y2="12.01"
                                    ></line>
                                    <path d="M3 13a20 20 0 0 0 18 0"></path>
                                </svg>
                                Work at: <strong>{company_name}</strong>
                            </SpacedGrid>
                        )}
                        {phone_numbers && (
                            <SpacedGrid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                                padding={0.5}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{
                                        width: "1rem",
                                        height: "1rem",
                                        fontSize: "1rem",
                                        verticalAlign: "text-bottom",
                                        marginRight: "10px",
                                    }}
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                    ></path>
                                    <path d="M4 4h5l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v5a1 1 0 0 1 -1 1a16 16 0 0 1 -16 -16a1 1 0 0 1 1 -1"></path>
                                </svg>
                                Phone:{" "}
                                <strong>
                                    {phone_numbers
                                        .filter((item) => item.primary)
                                        .map((item) => item.number)
                                        .join(", ")}
                                </strong>
                            </SpacedGrid>
                        )}
                        {city && state && country_code && (
                            <SpacedGrid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                                padding={0.5}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{
                                        width: "1rem",
                                        height: "1rem",
                                        fontSize: "1rem",
                                        verticalAlign: "text-bottom",
                                        marginRight: "10px",
                                    }}
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                    ></path>
                                    <polyline points="5 12 3 12 12 3 21 12 19 12"></polyline>
                                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                                </svg>
                                Lives:{" "}
                                <strong>
                                    {`${city}, ${state}, ${country_code}`}
                                </strong>
                            </SpacedGrid>
                        )}
                        <SpacedGrid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                            padding={0.5}
                        >
                            {facebook && (
                                <a
                                    href={`https://${facebook}`}
                                    target="_blank"
                                    style={{ color: "#6e7582" }}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        style={{
                                            fontSize: "1.5rem",
                                            width: "1rem",
                                            height: "1rem",
                                            verticalAlign: "text-bottom",
                                            marginRight: "10px",
                                        }}
                                    >
                                        <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"></path>
                                    </svg>
                                </a>
                            )}
                            {instagram && (
                                <a
                                    href={`https://${instagram}`}
                                    target="_blank"
                                    style={{ color: "#6e7582" }}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        style={{
                                            fontSize: "1.5rem",
                                            width: "1rem",
                                            height: "1rem",
                                            verticalAlign: "text-bottom",
                                            marginRight: "10px",
                                        }}
                                    >
                                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 0 0 1.384 2.126A5.868 5.868 0 0 0 4.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 0 0 2.126-1.384 5.86 5.86 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126A5.847 5.847 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"></path>
                                    </svg>
                                </a>
                            )}
                            {linkedin && (
                                <a
                                    href={`https://${linkedin}`}
                                    target="_blank"
                                    style={{ color: "#6e7582" }}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        style={{
                                            fontSize: "1.5rem",
                                            width: "1rem",
                                            height: "1rem",
                                            verticalAlign: "text-bottom",
                                            marginRight: "10px",
                                        }}
                                    >
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                                    </svg>
                                </a>
                            )}
                            {twitter && (
                                <a
                                    href={`https://${twitter}`}
                                    target="_blank"
                                    style={{ color: "#6e7582" }}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        style={{
                                            fontSize: "1.5rem",
                                            width: "1rem",
                                            height: "1rem",
                                            verticalAlign: "text-bottom",
                                            marginRight: "10px",
                                        }}
                                    >
                                        <path d="M23.954 4.569a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.061a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.937 4.937 0 0 0 4.604 3.417 9.868 9.868 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 0 0 2.46-2.548l-.047-.02z"></path>
                                    </svg>
                                </a>
                            )}
                            {github && (
                                <a
                                    href={`https://${github}`}
                                    target="_blank"
                                    style={{ color: "#6e7582" }}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        style={{
                                            fontSize: "1.5rem",
                                            width: "1rem",
                                            height: "1rem",
                                            verticalAlign: "text-bottom",
                                            marginRight: "10px",
                                        }}
                                    >
                                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                                    </svg>
                                </a>
                            )}
                        </SpacedGrid>
                    </SpacedGrid>
                </SpacedPaper>
            </Grid>
        </Box>
    );
};

export default ContentPanel;
