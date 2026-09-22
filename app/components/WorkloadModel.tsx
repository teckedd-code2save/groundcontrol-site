export default function WorkloadModel() {
  return (
    <figure
      className="workload-model"
      aria-label="Example of GroundControl entities and their relationships"
    >
      <figcaption>
        Example · one application, one deployment, several services
      </figcaption>
      <div className="model-row">
        <span>Project</span>
        <strong>Weekend planner</strong>
        <small>Optional organization</small>
      </div>
      <div className="model-deployment">
        <div className="model-row">
          <span>Deployment</span>
          <strong>weekend-production</strong>
          <small>On your VPS</small>
        </div>
        <div className="model-services">
          <span>
            web<small>Public application</small>
          </span>
          <span>
            api<small>Application service</small>
          </span>
          <span>
            postgres<small>Persistent data</small>
          </span>
          <span>
            redis<small>Cache / queue</small>
          </span>
        </div>
        <div className="model-row model-route">
          <span>Public route</span>
          <strong>app.example.com → web</strong>
          <small>Verified separately</small>
        </div>
      </div>
      <p>
        An OAuth grant selects the deployment. Operations act on that identity
        and record their results.
      </p>
    </figure>
  );
}
