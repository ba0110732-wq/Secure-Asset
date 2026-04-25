import { Router, type IRouter } from "express";
import healthRouter from "./health";
import symptomsRouter from "./symptoms";
import drugsRouter from "./drugs";
import consultationsRouter from "./consultations";
import vitalsRouter from "./vitals";
import profileRouter from "./profile";
import dashboardRouter from "./dashboard";
import blogRouter, { ensureSeedBlog, startBlogCron } from "./blog";
import communityRouter from "./community";
import sitemapRouter from "./sitemap";

const router: IRouter = Router();

router.use(healthRouter);
router.use(symptomsRouter);
router.use(drugsRouter);
router.use(consultationsRouter);
router.use(vitalsRouter);
router.use(profileRouter);
router.use(dashboardRouter);
router.use(blogRouter);
router.use(communityRouter);
router.use(sitemapRouter);

void ensureSeedBlog();
startBlogCron();

export default router;
